export const ALL_TABLE_REGEXP = "create\\s+table\\s+([\\w\\d_]+)\\s*\\(([^;]+)\\)\\s*;";

export const FOREIGN_KEYS_REGEXP = "^\\s*foreign\\s+key\\s+\\(\\s*([\\w\\d_]+)\\s*\\)\\s*references\\s*([\\w\\d_]+)\\s+\\(\\s*([\\w\\d_]+)\\s*\\)\\s*";

export const PRIMARY_KEYS_REGEXP = "^\\s*primary\\s+key\\s+\\(\\s*([\\w\\d\\s,_]+)\\s*\\)"
export const PRIMARY_KEYS_SPLIT_REGEXP = "\\s*,\\s*";

export const ATTRIBUTE_REGEXP = "\\s*([\\w\\d_]+)\\s*(.*)";

export const COLUMNS_SPLIT_REGEXP = "(?<!\\([\\s\\w\\d_]*),(?![\\s\\w\\d_]*\\))";

export const CHECK_FOREIGN_KEY_REGEXP = "^\\s*foreign\\s+key";

export const CHECK_PRIMARY_KEY_REGEXP = "^\\s*primary\\s+key";
export const CHECK_PRIMARY_KEY_REGEXP_2 = "\\s*primary\\s+key";