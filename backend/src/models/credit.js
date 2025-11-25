const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Credit extends Model {
        static associate(models) {
            Credit.belongsTo(models.User, { foreignKey: 'user_id' });
        }
    }
    Credit.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        user_id: DataTypes.UUID,
        balance: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        last_daily_claim: DataTypes.DATEONLY,
    }, {
        sequelize,
        modelName: 'Credit',
        tableName: 'credits',
        underscored: true,
    });
    return Credit;
};
