import { DataTypes, Model, Sequelize } from 'sequelize'
import { MunicipalityInterface } from '../../../interfaces/sharedInterfaces'

export default class Municipality
  extends Model<MunicipalityInterface, Omit<MunicipalityInterface, 'id'>>
  implements MunicipalityInterface
{
  public id!: string
  public state_id!: string
  public municipality!: string
  public active?: boolean
}

export function initMunicipalitiesModel(sequelize: Sequelize): void {
  Municipality.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      state_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'states',
          key: 'id'
        }
      },
      municipality: {
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
      modelName: 'municipalities',
      timestamps: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci'
    }
  )
}
