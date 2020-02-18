module.exports.swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: 'NodeJS Auth API',
    version: '0.1.9',
    description: 'Registers and managers user credentials. Generates tokens and refresh tokens.'
  },
  "servers": [{
    "url": "http://localhost:3004/v1/api/auth/",
    "description": "Main server"
  }],
  host: 'localhost:3004',
  basePath: '/v1/api/auth',
  securityDefinitions: {},
  paths: {
    "/register": {
      "post": {
        "tags": [
          "Authentication"
        ],
        "summary": "Endpoint to register a new user",
        "description": "Takes new users email and password and logs the user in. Returns access & refresh token",
        "parameters": [{
          "name": "registerdetails",
          "in": "body",
          "description": "Object containing email, password and confirm password",
          "required": true,
          "schema": {
            "type": "object",
            "items": {
              "types": "object"
            },
            "example": {
              "email": "john.doe@gmail.com",
              "password": "pass1234",
              "confirmPassword": "pass1234"
            }
          }
        }],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number"
                    },
                    "message": {
                      "type": "string"
                    },
                    "data": {
                      "type": "object"
                    }
                  },
                  "example": {
                    "status": 200,
                    "message": "User registered successfully",
                    "data": {
                      "access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI0Znl6aDhnb2s2cnV3dHNuIiwiaWF0IjoxNTgyMDI4NDgzLCJleHAiOjE1ODIwMjg1NDN9.N52EZYS61cTN2zf6LuvYPasq_ZjWYbKwC6sFdOD1sFY",
                      "refresh-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI0Znl6aDhnb2s2cnV3dHNuIiwiaWF0IjoxNTgyMDI4NDgzfQ.8HHECqGZG2tVcZwBbzLyoFpRksieNq11YFzBjftSjKc",
                      "expiresIn": 1582028543
                    }
                  }
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number"
                    },
                    "message": {
                      "type": "string"
                    },
                    "data": {
                      "type": "object"
                    }
                  },
                  "example": {
                    "status": 500,
                    "message": "Internal server error. Try again.",
                    "error": "User validation failed: email: Error, expected `email` to be unique. Value: `sam.son@gmail.com`",
                    "data": {}
                  }
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number"
                    },
                    "message": {
                      "type": "string"
                    },
                    "data": {
                      "type": "object"
                    }
                  },
                  "example": {
                    "status": 500,
                    "message": "Internal server error. Try again.",
                    "error": "User validation failed: email: Error, expected `email` to be unique. Value: `sam.son@gmail.com`",
                    "data": {}
                  }
                }
              }
            }
          }
        }
      }
    },
    "/login": {
      "post": {
        "tags": [
          "Authentication"
        ],
        "summary": "Route to log user in",
        "description": "Logs user in and returns access and refresh token",
        "parameters": [{
          "name": "logindetails",
          "in": "body",
          "description": "Object containing email and password",
          "required": true,
          "schema": {
            "type": "object",
            "items": {
              "types": "object"
            },
            "example": {
              "email": "john.doe@gmail.com",
              "password": "pass1234"
            }
          }
        }],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number"
                    },
                    "message": {
                      "type": "string"
                    },
                    "data": {
                      "type": "object"
                    }
                  },
                  "example": {
                    "status": 400,
                    "message": "Wrong details",
                    "data": {}
                  }
                }
              }
            }
          },
          "200": {
            "description": "Success",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number"
                    },
                    "message": {
                      "type": "string"
                    },
                    "data": {
                      "type": "object"
                    }
                  },
                  "example": {
                    "status": 200,
                    "message": "User logged in",
                    "data": {
                      "access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI0Znl6aDhnb2s2cnV3dHNuIiwiaWF0IjoxNTgyMDMwMTk2LCJleHAiOjE1ODIwMzAyNTZ9.0EfxgsIRl_hULwElo-N-TVaN8BWs5FbuCpSfbyVbX74",
                      "refresh-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI0Znl6aDhnb2s2cnV3dHNuIiwiaWF0IjoxNTgyMDMwMTk2fQ.npcQucLzx1Ga-rdmDvuBc9DTRw9cEufeHm8bMUPuIuc",
                      "expiresIn": 1582030256
                    }
                  }
                }
              }
            }
          },
        }
      }
    },
    "/changepassword": {
      "post": {
        "tags": [
          "Authentication"
        ],
        "summary": "Route to change a users password",
        "description": "Changes users password after verification",
        "parameters": [{
          "name": "change password object",
          "in": "body",
          "description": "Object containing email, current, new and confirm new password of registered user",
          "required": true,
          "schema": {
            "type": "string",
            "properties": {
              "email": {
                "type": "string"
              },
              "currentPassword": {
                "type": "string"
              },
              "newPassword": {
                "type": "string"
              },
              "confirmNewPassword": {
                "type": "string"
              }
            },
            "example": {
              "email": "john.doe@gmail.com",
              "currentPassword": "pass1234",
              "newPassword": "12345678",
              "confirmNewPassword": "12345678"
            }
          }
        }],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number"
                    },
                    "message": {
                      "type": "string"
                    },
                    "data": {
                      "type": "object"
                    }
                  },
                  "example": {
                    "status": 200,
                    "message": "Password changed",
                    "data": {
                      "userID": "4fyzh8gok6ruwtsn"
                    }
                  }
                }
              }
            }
          },
          "200": {
            "description": "Success",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number"
                    },
                    "message": {
                      "type": "string"
                    },
                    "data": {
                      "type": "object"
                    }
                  },
                  "example": {
                    "status": 400,
                    "message": "Invalid token",
                    "data": {}
                  }
                }
              }
            }
          }
        }
      }
    },
    "/details": {
      "post": {
        "tags": [
          "Authentication"
        ],
        "summary": "Route to get a users details",
        "description": "Returns users email address and date created",
        "parameters": [{
          "name": "email",
          "in": "body",
          "description": "Object containing email",
          "required": true,
          "schema": {
            "type": "string",
            "properties": {
              "email": {
                "type": "string"
              }
            },
            "example": {
              "email": "john.doe@gmail.com"
            }
          }
        }],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number"
                    },
                    "message": {
                      "type": "string"
                    },
                    "data": {
                      "type": "object"
                    }
                  },
                  "example": {
                    "status": 200,
                    "message": "User auth details",
                    "data": {
                      "userID": "4fyzh20kk6rwgoi8",
                      "email": "jerryakpera@gmail.com",
                      "created": "2020-02-18T13:04:48.676Z"
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/editemail": {
      "post": {
        "tags": [
          "Authentication"
        ],
        "summary": "Route to edit a users details",
        "description": "Changes users email address",
        "parameters": [{
          "name": "email",
          "in": "body",
          "description": "Object containing email",
          "required": true,
          "schema": {
            "type": "string",
            "properties": {
              "email": {
                "type": "string"
              }
            },
            "example": {
              "oldEmail": "john.doe@gmail.com",
              "newEmail": "johndoe.new@gmail.com"
            }
          }
        }],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number"
                    },
                    "message": {
                      "type": "string"
                    },
                    "data": {
                      "type": "object"
                    }
                  },
                  "example": {
                    "status": 200,
                    "message": "User edited",
                    "data": {
                        "userID": "4fyzh5xkk6rwn6uh"
                    }
                }
                }
              }
            }
          }
        }
      }
    },
    "/delete": {
      "post": {
        "tags": [
          "Authentication"
        ],
        "summary": "Route to delete a registered user",
        "description": "Removes user from db and removes users refresh token",
        "parameters": [{
          "name": "useremail",
          "in": "body",
          "description": "Object containing email",
          "required": true,
          "schema": {
            "type": "object",
            "properties": {
              "email": {
                "type": "string"
              }
            },
            "example": {
              "email": "jerryakpera@gmail.com"
            }
          }
        }],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number"
                    },
                    "message": {
                      "type": "string"
                    },
                    "data": {
                      "type": "object"
                    }
                  },
                  "example": {
                    "status": 200,
                    "message": "User deleted!",
                    "data": {}
                  }
                }
              }
            }
          },
          "200": {
            "description": "Success",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number"
                    },
                    "message": {
                      "type": "string"
                    },
                    "data": {
                      "type": "object"
                    }
                  },
                  "example": {
                    "status": 401,
                    "message": "Access denied",
                    "data": {}
                  }
                }
              }
            }
          }
        }
      }
    },
  }
}