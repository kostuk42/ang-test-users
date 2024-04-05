import {User} from "../models/models";

export const EMPTY_USER: User = Object.freeze( {
  username: '',
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  user_type: ''
})
