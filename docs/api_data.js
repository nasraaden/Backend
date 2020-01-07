define({ "api": [
  {
    "type": "post",
    "url": "/api/login",
    "title": "",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "size": "...128",
            "optional": false,
            "field": "username",
            "description": "<p>Username must exist in the database</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "...128",
            "optional": false,
            "field": "password",
            "description": "<p>Password must match in the database</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response-Example:",
          "content": "HTTP/1.1 200 Success\n{\n\"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluMSIsImlhdCI6MTU3ODQwOTg1OCwiZXhwIjoxNTc4NDk2MjU4fQ.NIWZvQiWC1ux1991ZC58SgRxum9GAWuFByORv-2FKoE\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/users/route.js",
    "group": "C:\\Users\\tommy\\Desktop\\Lambda\\Backend\\api\\routes\\users\\route.js",
    "groupTitle": "C:\\Users\\tommy\\Desktop\\Lambda\\Backend\\api\\routes\\users\\route.js",
    "name": "PostApiLogin"
  },
  {
    "type": "post",
    "url": "/api/register",
    "title": "",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "size": "...128",
            "optional": false,
            "field": "username",
            "description": "<p>Username must be unique</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "...128",
            "optional": false,
            "field": "password",
            "description": "<p>Cannont be Null</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response-Example:",
          "content": "HTTP/1.1 201 Created\n {\n \"id\": 2,\n\"username\": \"admin1\",\n\"password\": \"$2a$08$bZjiTjG1taKufx5s6JuJ8.jm63qoM2dXlk22a9dOPW/Bt8xtWLm9m\"\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/users/route.js",
    "group": "C:\\Users\\tommy\\Desktop\\Lambda\\Backend\\api\\routes\\users\\route.js",
    "groupTitle": "C:\\Users\\tommy\\Desktop\\Lambda\\Backend\\api\\routes\\users\\route.js",
    "name": "PostApiRegister"
  }
] });
