'use strict';
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const AppError = require('../utils/appError');
const { createMongoUser, updateMongoUser } = require("../dtos/denormalization/userMongo");

const {
  Model
} = require('sequelize');
const logger = require('../utils/logger');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Customer, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    }
    static addHooks(models) {
      User.addHook('beforeCreate', async (user) => {
        const hash = await bcrypt.hash(user.password, await bcrypt.genSalt(12));
        user.password = hash;
        user.passwordConfirmation = undefined;
      });

      User.addHook('beforeUpdate', async (user, { fields }) => {
        if (fields.includes("password")) {
          console.log('beforeUpdate has been called on User Model');
          const hash = await bcrypt.hash(user.password, await bcrypt.genSalt(12));
          user.passwordConfirmation = undefined;
          user.password = hash;
        }
      });
    }
    
    async correctPassword(candidatePassword, userPassword) {
      return await bcrypt.compare(candidatePassword, userPassword);
    }
  
    async createPasswordResetToken() {
      const resetToken = crypto.randomBytes(32).toString('hex');
      this.passwordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');
      this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
      
      logger.info("Le lien pour renouveller le mot-de-passe", `http://localhost:8080/resetPassword/${resetToken}`)

      await this.save();

      return resetToken;
    }
  
    changedPasswordAfter(JWTTimestamp) {
      if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
        return JWTTimestamp < changedTimestamp;
      }
      return false;
    }
  
    createEmailConfirmToken() {
      const confirmToken = crypto.randomBytes(32).toString('hex');
      this.emailConfirmToken = crypto
        .createHash('sha256')
        .update(confirmToken)
        .digest('hex');
      this.emailConfirmExpires = Date.now() + 24 * 60 * 60 * 1000;
      this.emailConfirmed = false;

      logger.info(`Le lien pour confirmer l'email: http://localhost:8080/confirm-email/${confirmToken}`)

      return confirmToken;
    }
  
    async handleFailedLoginAttempts(next) {

      let maxTimeDifference;

      if (process.env.NODE_ENV === 'development') {
        maxTimeDifference = 1 * 60 * 1000;
      } else {
        maxTimeDifference = 10 * 60 * 1000;
      }

      const timeDifference = Date.now() - this.maxFailedLoginAt;
      const isBanTimeExceeded = timeDifference > maxTimeDifference;
      
      if (isBanTimeExceeded) {
        this.failAccess = 0;
        this.maxFailedLoginAt = null;
        await this.save();
        return true;
      }
  
      if (this.failAccess >= 3 && !this.maxFailedLoginAt) {
        this.maxFailedLoginAt = new Date();
        await this.save();
      }
  
      if (!isBanTimeExceeded && this.failAccess >= 3) {
        return next(new AppError(401));
      }
  
      return true;
    }
  
    shouldRenewPassword() {
      const createdAt = this.createdAt;
      const passwordChangedAt = this.passwordChangedAt;
  
      if (passwordChangedAt) {
        const renewalDate = new Date(passwordChangedAt.getTime());
        renewalDate.setDate(renewalDate.getDate() + 60);
        return new Date() > renewalDate;
      } else {
        const currentDate = new Date();
        const createdMoreThan60Days = new Date(createdAt.getTime());
        createdMoreThan60Days.setDate(createdMoreThan60Days.getDate() + 60);
        return currentDate > createdMoreThan60Days;
      }
    }
  }
  User.init({
    firstname: {
      type: DataTypes.STRING(45),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please tell us your firstname!'
        }
      }
    },
    lastname: {
      type: DataTypes.STRING(45),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please tell us your lastname!'
        }
      }
    },
    email: {
      type: DataTypes.STRING(35),
      allowNull: false,
      unique: true,
      lowercase: true,
      validate: {
        max: 320,
        isEmail: {
          msg: "Please provide a valid email",
        },
      },
    },
    photo: {
      type: DataTypes.STRING(300),
      defaultValue: 'default.jpg',
    },
    role: {
      type: DataTypes.ENUM,
      values: ['user', 'customer', 'admin'],
      defaultValue: 'user'
    },
    password: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        is: {
          args: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/,
          msg: 'Password must contain at least one uppercase letter, one lowercase letter, one digit, one special character, and be at least 12 characters long'
        },
      }
    },
    passwordConfirmation: {
      type: DataTypes.STRING(50),
      validate: {
        isPasswordMatch(value) {
          if (value !== this.password) {
            throw new Error('Passwords are not the same!');
          }
        }
      }
    },
    passwordChangedAt: DataTypes.DATE,
    passwordResetToken: DataTypes.STRING,
    passwordResetExpires: DataTypes.DATE,
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    emailConfirmToken: DataTypes.STRING,
    emailConfirmExpires: DataTypes.DATE,
    emailConfirmed: DataTypes.BOOLEAN,
    failAccess: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    maxFailedLoginAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'User',
    paranoid: true,
    deletedAt: true,
    defaultScope: {
      attributes: { exclude:
        [
        'passwordConfirmation',
        'password',
        'passwordResetToken',
        'passwordResetExpires',
        'emailConfirmed',
        'emailConfirmToken',
        'emailConfirmExpires',
        'passwordChangedAt',
        'failAccess',
        'maxFailedLoginAt',
        'active',
        'role'
      ]
      },
      where: {
        active: true,
      },
    },
    timestamps: true,
  });
  return User;
};
