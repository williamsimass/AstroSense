const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class HoroscopeQuery extends Model {
        static associate(models) {
            HoroscopeQuery.belongsTo(models.User, { foreignKey: 'user_id' });
        }
    }
    HoroscopeQuery.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        user_id: DataTypes.UUID,
        type: DataTypes.STRING,
        prompt: DataTypes.TEXT,
        response: DataTypes.TEXT,
    }, {
        sequelize,
        modelName: 'HoroscopeQuery',
        tableName: 'horoscope_queries',
        underscored: true,
    });
    return HoroscopeQuery;
};
