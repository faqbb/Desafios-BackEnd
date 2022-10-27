module.exports = {
  apps : [{
    name   : "app",
    script : "src/app.js",
    env:{
      PORT:8080
    }
  },
  {
    name   : "app2",
    script : "src/app.js",
    env:{
      PORT:8081
    }
  },
  {
    name   : "app3",
    script : "src/app.js",
    env:{
      PORT:8082
    },
    exec_mode:'cluster',
    instances:8,
    node_args: '--harmony'
  },
]
}
