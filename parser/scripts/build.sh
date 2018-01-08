#!/usr/bin/env sh

set -o errexit

antlr4 -Dlanguage=JavaScript grammar/Solidity.g4 -o lib

mv lib/grammar/* lib/

rmdir lib/grammar

sed -i.bak -e 's/antlr4\/index/\.\.\/antlr4\/index/g' lib/*.js
 
find lib -name '*.js.bak' -delete
