import { DataTypes, Model, Sequelize } from 'sequelize'
import { ParishInterface } from '../../../interfaces/sharedInterfaces'

export default class Parish
  extends Model<ParishInterface, Omit<ParishInterface, 'id'>>
  implements ParishInterface
{
  id!: string
  municipality_id!: string
  parish!: string
  active?: boolean
}

export function initParishesModel(sequelize: Sequelize): void {
  Parish.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      municipality_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'municipalities',
          key: 'id'
        }
      },
      parish: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      }
    },
    {
      sequelize,
      modelName: 'parishes',
      timestamps: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci',
      indexes: [
        {
          unique: true,
          fields: ['municipality_id', 'parish']
        }
      ]
    }
  )
}
