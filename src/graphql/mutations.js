import { gql } from "@apollo/client"

export const CREATE_CAR = gql`
mutation createCar($marca:String, $tipo:String, $referencia:String, $modelo:String, $cilindraje:String, $user:ID, $imagen:String) {
  createCar(input: {marca:$marca, tipo:$tipo, referencia:$referencia,modelo:$modelo, cilindraje:$cilindraje, user:$user, imagen:$imagen}) {
    tipo
    referencia
    modelo
    cilindraje
    marca
    imagen
    id
  }
}
`
export const UPDATE_CAR = gql`
mutation updateCar($marca:String, $tipo:String, $referencia:String, $modelo:String, $cilindraje:String, $user:ID, $imagen:String, $id:ID) {
  updateCar(input: {marca:$marca, tipo:$tipo, referencia:$referencia,modelo:$modelo, cilindraje:$cilindraje, user:$user, imagen:$imagen, id:$id}) {
    tipo
    referencia
    modelo
    cilindraje
    marca
    imagen
    id
  }
}
`
export const CREATE_GASTO = gql`
  mutation createGasto($dineroGastado:String, $tipo:String,$lugar:String, $description:String, $imagen:String, $fecha:Date, $vehiculo:ID){
    createGasto(input:{dineroGastado:$dineroGastado,tipo:$tipo,lugar:$lugar, description:$description, imagen:$imagen, fecha:$fecha, vehiculo:$vehiculo}){
      tipo
      dineroGastado
      fecha
      id
      lugar
      vehiculo
    }
  }
`
export const UPDATE_GASTO = gql`
  mutation updateGasto($dineroGastado:String, $tipo:String,$lugar:String, $description:String, $imagen:String, $fecha:Date, $vehiculo:ID, $id:ID){
    updateGasto(input:{dineroGastado:$dineroGastado,tipo:$tipo,lugar:$lugar, description:$description, imagen:$imagen, fecha:$fecha, vehiculo:$vehiculo, id:$id}){
      tipo
      dineroGastado
      fecha
      id
      description
      lugar
      imagen
    }
  }
`
export const EDIT_USER = gql`
    mutation editUser($name:String, $apellido:String, $avatar:String, $ciudad:String, $pais:String){
        editUser(input:{name:$name, apellido:$apellido, avatar:$avatar, ciudad:$ciudad, pais:$pais}){
                name
                apellido
                pais
                avatar
                ciudad
                id
                role
        }
    }
`
export const CREATE_RECORDATORIO = gql`
    mutation createRecordatorio($titulo:String, $description:String, $fecha:Date){
        createRecordatorio(input:{titulo:$titulo, description:$description, fecha:$fecha}){
            titulo
            description
            fecha
            id
        }
    }
`
export const SIGN_IN_MUTATION = gql`
mutation signIn($email: String!, $password:String!) {
    signIn(input:{email: $email, password:$password}) {
      user {
        email
        id
        name
        role
      }
      token
    }
  }
`  
export const SIGN_UP = gql`
mutation signUp($email: String!, $password:String!, $name:String!, $lastName:String!, $confirmPassword:String!) {
  signUp(input:{email: $email, password:$password, name:$name, confirmPassword:$confirmPassword, lastName:$lastName}) {
    user {
      email
      name
      id
    }
    token
  }
}
`
export const DELETE_GASTO = gql`
  mutation deleteGasto($id:ID!, $idVehiculo:ID!){
    deleteGasto(id:$id, idVehiculo:$idVehiculo)
    
  }
`
export const DELETE_RECORDATORIO =gql`
  mutation deleteRecordatorio($id:ID!){
    deleteRecordatorio(id:$id)
  }
`