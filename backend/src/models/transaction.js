const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Transaction extends Model {
        static associate(models) {
            Transaction.belongsTo(models.User, { foreignKey: 'user_id' });
        }
    }
    Transaction.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        user_id: DataTypes.UUID,
        amount: DataTypes.INTEGER,
        price: DataTypes.DECIMAL(10, 2),
        status: {
            type: DataTypes.ENUM('pending', 'paid', 'failed'),
            defaultValue: 'pending',
        },
        payment_provider_id: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Transaction',
        tableName: 'transactions',
        underscored: true,
    });
    return Transaction;
};
