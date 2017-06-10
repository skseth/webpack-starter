# -a archive
# -v verbose

if [[ $# -le 1 ]]; then
    echo "*** ERROR - too few arguments"
    echo "Usage: create-app projecttype targetdir"
    echo "projecttype can be vanilla or react"
    exit 1
fi

SCRIPTDIR="$( dirname "$SOURCE" )"

projecttype=$1
targetdir=$2

# terminal slash means dir contents are used
srcdir="$SCRIPTDIR/$projecttype/"

nodemoddir="node_modules"
packagejsonlock="package-lock.json"
eslintcache=".eslintcache"
builddir="build"

mkdir -p $targetdir

echo $packagejsonlock

rsync -av --exclude=$nodemoddir --exclude=$packagejsonlock --exclude=$eslintcache --exclude=$builddir $srcdir $targetdir