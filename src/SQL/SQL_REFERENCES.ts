const tablesNames = {
    user: "AZURE_FUNCTIONS_user_table",
}

const procedureNames = {
    GET_USERS: "sp_get_users",
    INSERT_USER : "sp_insert_user",
    DELETE_USER : "sp_delete_user",
}

const columnNames = {
    USER_ID : "user_id",
    USER_NAME : "user_name",
    USER_CREATED_AT : "user_created_at",
    FILE_NAME_ID : "file_name_id",
    FILE_NAME_NAME : "file_name_name",
    FILE_NAME_CREATED_AT : "file_name_created_at",
    FIRST_LINE : "file_line",
    USER_TIME_TO_LIVE: "user_time_to_live"
}

const procedureVariables = {
    user_id : columnNames.USER_ID + "var",
    user_name : columnNames.USER_NAME + "var",
    user_created_at : columnNames.USER_CREATED_AT + "var",
    user_time_to_live : columnNames.USER_TIME_TO_LIVE + "var"
}

export {
    procedureNames,
    tablesNames,
    procedureVariables,
    columnNames
}