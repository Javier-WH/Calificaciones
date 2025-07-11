import { DataTypes, Model, Sequelize } from 'sequelize'
import { ParishInterface } from '../../../interfaces/sharedInterfaces'

export default class Parish
  extends Model<ParishInterface, Omit<ParishInterface, 'id'>>
  implements ParishInterface
{
  public id!: string
  public municipality_id!: string
  public parish!: string
  public active?: boolean
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
        allowNull: false,
        unique: true
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
      collate: 'utf8mb4_unicode_ci'
    }
  )
}
