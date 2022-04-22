
# runs nodemon and sass transpiler at the same time
exec concurrently "nodemon" "sass --watch public/styles"

# remember to ctrl+c to kill the process
# else, server will still listen on port 3000
