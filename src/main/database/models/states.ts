import { DataTypes, Model, Sequelize } from 'sequelize'
import { StateInterface } from '../../../interfaces/sharedInterfaces'

export default class State
  extends Model<StateInterface, Omit<StateInterface, 'id'>>
  implements StateInterface
{
  public id!: string
  public state!: string
  public active?: boolean
}

export function initStatesModel(sequelize: Sequelize): void {
  State.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      state: {
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
      modelName: 'states',
      timestamps: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci'
    }
  )
}
