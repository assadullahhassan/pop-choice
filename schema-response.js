export const schemaResponse = {
  "type": "json_schema",
  "json_schema": {
    "name": "movies_response",
    "strict": true,
    "schema": {
      "type": "object",
      "properties": {
        "steps": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "title": { "type": "string" },
              "description": { "type": "string" }
            },
            "required": ["title", "description"],
            "additionalProperties": false
          }
        },
      },
    }
  }
}

