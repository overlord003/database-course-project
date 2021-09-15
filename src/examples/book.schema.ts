import { SchemeDescription, ColumnDescription, TableDescription, ForeignKeyDescription } from '../app/my-graph/my-graph.component';

const bookSchema: SchemeDescription = [
    {
        "tableName": "authors",
        "columns": [
            {
                "attrName": "id",
                "attrType": "integer"
            },
            {
                "attrName": "created_at",
                "attrType": "timestamp"
            },
            {
                "attrName": "updated_at",
                "attrType": "timestamp"
            },
            {
                "attrName": "name",
                "attrType": "varchar"
            }
        ],
        "primaryKeys": ["id"]
    },
    {
        "tableName": "series",
        "columns": [
            {
                "attrName": "id",
                "attrType": "integer"
            },
            {
                "attrName": "created_at",
                "attrType": "timestamp"
            },
            {
                "attrName": "updated_at",
                "attrType": "timestamp"
            },
            {
                "attrName": "title",
                "attrType": "varchar"
            }
        ],
        "primaryKeys": ["id"]
    },
    {
        "tableName": "books",
        "columns": [
            {
                "attrName": "id",
                "attrType": "integer"
            },
            {
                "attrName": "created_at",
                "attrType": "timestamp"
            },
            {
                "attrName": "updated_at",
                "attrType": "timestamp"
            },
            {
                "attrName": "title",
                "attrType": "varchar"
            }
        ],
        "primaryKeys": ["id"]
    },
    {
        "tableName": "publications",
        "columns": [
            {
                "attrName": "id",
                "attrType": "integer"
            },
            {
                "attrName": "book_id",
                "attrType": "integer"
            },
            {
                "attrName": "publication_year",
                "attrType": "smallint"
            }
        ],
        "primaryKeys": ["id"],
        "foreignKeys": [
            {
                "currentAttr": "book_id",
                "targetTable": "books",
                "targetAttr": "id"
            }
        ]
    },
    {
        "tableName": "book_files",
        "columns": [
            {
                "attrName": "publication_id",
                "attrType": "integer"
            },
            {
                "attrName": "file_path",
                "attrType": "varchar"
            },
            {
                "attrName": "file_type",
                "attrType": "varchar"
            }
        ],
        "foreignKeys": [
            {
                "currentAttr": "publication_id",
                "targetTable": "publications",
                "targetAttr": "id"
            }
        ]
    },
    {
        "tableName": "users",
        "columns": [
            {
                "attrName": "id",
                "attrType": "integer"
            },
            {
                "attrName": "name",
                "attrType": "varchar"
            },
            {
                "attrName": "surname",
                "attrType": "varchar"
            }
        ]
    },
    {
        "tableName": "book_authors",
        "columns": [
            {
                "attrName": "author_id",
                "attrType": "integer"
            },
            {
                "attrName": "book_id",
                "attrType": "varchar"
            }
        ],
        "foreignKeys": [
            {
                "currentAttr": "author_id",
                "targetTable": "authors",
                "targetAttr": "id"
            },
            {
                "currentAttr": "book_id",
                "targetTable": "books",
                "targetAttr": "id"
            }
        ]
    },
    {
        "tableName": "book_series",
        "columns": [
            {
                "attrName": "series_id",
                "attrType": "integer"
            },
            {
                "attrName": "book_id",
                "attrType": "integer"
            }
        ],
        "foreignKeys": [
            {
                "currentAttr": "series_id",
                "targetTable": "series",
                "targetAttr": "id"
            },
            {
                "currentAttr": "book_id",
                "targetTable": "books",
                "targetAttr": "id"
            }
        ]
    },
    {
        "tableName": "events",
        "columns": [
            {
                "attrName": "id",
                "attrType": "integer"
            },
            {
                "attrName": "data",
                "attrType": "jsonb"
            }
        ],
        "primaryKeys": ["id"]
    },
    {
        "tableName": "recent_viewed",
        "columns": [
            {
                "attrName": "id",
                "attrType": "integer"
            },
            {
                "attrName": "user_id",
                "attrType": "integer"
            }
        ],
        "foreignKeys": [
            {
                "currentAttr": "user_id",
                "targetTable": "users",
                "targetAttr": "id"
            }
        ]
    }
];