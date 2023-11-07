#!/bin/bash


GREEN_COLOR='\0;32[0;32m'
RED_COLOR='\033[0;31m'


COMMAND_GIT_PULL=$(git pull origin )

COMMAND_BUILD=$(docker compose exec admin-app npm run build --force)

COMMAND_INSTALL=$(docker compose exec admin-app npm install --force)

displayError() {
   printf "${RED_COLOR}***************************\n"
   printf "* Error: Invalid argument - current branch repository project branch not selected*\n"
   printf "* Help:  Invalid argument - Use install.sh -b current <branch name>*\n"
   printf "***************************\n"
}


#parse argument branch:

while [ $# -gt 0 ]; do
  case "$1" in
    -b|-branch|--branch)
      branch="$2"
      ;;
    *)
      displayError
      exit 1
  esac
  shift
  shift
done


if [ -z "${branch}" ]
then
      displayError
      exit 1
else

echo "step 01: run command git pull origin: ${branch}";    

echo $COMMAND_GIT_PULL ${branch};

echo "step 02: npm install packages command: "

echo $COMMAND_INSTALL ;

echo "step 03: build project command: ";

echo $COMMAND_BUILD ;

echo "step 04: finish build step"

fi
