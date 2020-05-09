
const tablesNames = {
    user: "user_table"
}

const procedureNames = {
    GET_USERS: "sp_get_users",
    INSERT_USER : "sp_insert_user",
    DELETE_USER : "sp_delete_user"
}

const procedureVariables = {
    user_id : "user_id_var",
    user_name : "user_name_var",
    user_created_at : "user_created_at_var",
}



export {
    procedureNames,
    tablesNames,
    procedureVariables
}