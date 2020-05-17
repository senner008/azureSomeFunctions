const tablesNames = {
    user: "AZURE_FUNCTIONS_user_table",
    file_name : "AZURE_FUNCTIONS_file_name_table"
}

const procedureNames = {
    GET_USERS: "sp_get_users",
    INSERT_USER : "sp_insert_user",
    DELETE_USER : "sp_delete_user",
    INSERT_BLOB_UPLOAD_FILE_NAME : "sp_insert_blob_upload_file_name"
}

const columnNames = {
    USER_ID : "user_id",
    USER_NAME : "user_name",
    USER_CREATED_AT : "user_created_at",
    FILE_NAME_ID : "file_name_id",
    FILE_NAME_NAME : "file_name_name",
    FILE_NAME_CREATED_AT : "file_name_created_at",
    FIRST_LINE : "file_line"
}

const procedureVariables = {
    user_id : columnNames.USER_ID + "var",
    user_name : columnNames.USER_NAME + "var",
    user_created_at : columnNames.USER_CREATED_AT + "var",
    file_name_id : columnNames.FILE_NAME_ID + "var",
    file_name_name : columnNames.FILE_NAME_NAME + "var",
    file_name_created_at : columnNames.FILE_NAME_CREATED_AT + "var",
    file_first_line : columnNames.FIRST_LINE + "var",
}

export {
    procedureNames,
    tablesNames,
    procedureVariables,
    columnNames
}