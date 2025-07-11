import { DataTypes, Model, Sequelize } from 'sequelize'

export default class Students extends Model {}

export function initStudentsModel(sequelize: Sequelize): void {
  Students.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      ci: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
      },
      nationality_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'nationalities',
          key: 'id'
        }
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      gender: {
        type: DataTypes.CHAR(1),
        allowNull: false
      },
      birdthDate: {
        type: DataTypes.DATE,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'students',
      timestamps: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci'
    }
  )
}
