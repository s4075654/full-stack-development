#!/bin/ksh

rm=0
compile=0
run=0

while getopts ":mcr" option; do
    case $option in
        m) rm=1;;
        c) compile=1;;
        r) run=1;;
    esac
done

shift $((OPTIND-1))

if [ $rm -eq 1 ];
    then rm -rf prod
fi
if [ $compile -eq 1 ];
    then yarn tsc
fi
if [ $run -eq 1 ];
    then node .
fi