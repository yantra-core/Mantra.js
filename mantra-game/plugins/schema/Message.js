let messageSchema = {
  "nested": {
    "ActionTypes": {
      "values": {
        "GAMETICK": 0,
        "ASSIGN_ID": 1,
        "BECOME_TICKER": 2,
        "PONG": 3
      }
    },
    "Position": {
      "fields": {
        "x": {
          "type": "int32",
          "id": 1
        },
        "y": {
          "type": "int32",
          "id": 2
        }
      }
    },
    "Velocity": {
      "fields": {
        "x": {
          "type": "int32",
          "id": 1
        },
        "y": {
          "type": "int32",
          "id": 2
        }
      }
    },
    "Player": {
      "fields": {
        "id": {
          "type": "uint32",
          "id": 1
        },
        "name": {
          "type": "string",
          "id": 2
        },
        "type": {
          "type": "string",
          "id": 3
        },
        "position": {
          "type": "Position",
          "id": 4
        },
        "velocity": {
          "type": "Velocity",
          "id": 5
        },
        "width": {
          "type": "int32",
          "id": 6
        },
        "height": {
          "type": "int32",
          "id": 7
        },
        "rotation": {
          "type": "int32",
          "id": 8
        },
        "mass": {
          "type": "int32",
          "id": 9
        },
        "health": {
          "type": "int32",
          "id": 10
        },
        "depth": {
          "type": "double",
          "id": 11
        },
        "lifetime": {
          "type": "int32",
          "id": 12
        },
        "radius": {
          "type": "double",
          "id": 13
        },
        "isSensor": {
          "type": "bool",
          "id": 14
        },
        "isStatic": {
          "type": "bool",
          "id": 15
        },
        "destroyed": {
          "type": "bool",
          "id": 16
        },
        "owner": {
          "type": "uint32",
          "id": 17
        },
        "maxSpeed": {
          "type": "int32",
          "id": 18
        },
        "texture": {
          "type": "Texture",
          "id": 19
        }
      }
    },
    "Message": {
      "fields": {
        "id": {
          "type": "uint32",
          "id": 1
        },
        "action": {
          "type": "ActionTypes",
          "id": 2
        },
        "state": {
          "rule": "repeated",
          "type": "Player",
          "id": 3
        },
        "lastProcessedInput": {
          "type": "uint32",
          "id": 4
        }
      }
    },
    "Texture": {
      "fields": {
        "key": {
          "type": "string",
          "id": 1
        },
        "url": {
          "type": "string",
          "id": 2
        },
        "frames": {
          "rule": "repeated",
          "type": "Frame",
          "id": 3
        },
        "sprite": {
          "type": "string",
          "id": 4
        },
        "rate": {
          "type": "int32",
          "id": 5
        }
      }
    },
    "Frame": {
      "fields": {
        "x": {
          "type": "int32",
          "id": 1
        },
        "y": {
          "type": "int32",
          "id": 2
        }
      }
    }
  }
}

export default messageSchema;
