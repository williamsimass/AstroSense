const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.hasOne(models.Credit, { foreignKey: 'user_id', as: 'credit' });
            User.hasMany(models.Transaction, { foreignKey: 'user_id', as: 'transactions' });
            User.hasMany(models.HoroscopeQuery, { foreignKey: 'user_id', as: 'queries' });
        }
    }
    User.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        password_hash: DataTypes.STRING,
        sign: DataTypes.STRING,
        birth_date: DataTypes.DATEONLY,
        role: {
            type: DataTypes.ENUM('user', 'admin'),
            defaultValue: 'user',
        },
    }, {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        underscored: true,
    });
    return User;
};
