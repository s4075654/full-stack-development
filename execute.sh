#!/usr/bin/env ksh

if [ $# -lt 1 ]; then
    echo "Not enough arguments."
    exit $#
fi

while getopts ":crtn" option; do
    case $option in
        c) clear;;
        r) rm -rf prod;;
        t) yarn tsc;;
        n) node .;;
        ?) echo "Invalid argument(s)."
            exit $#
    esac
done

shift $((OPTIND-1))