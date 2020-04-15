#Copy local repo to UFIT Apache hosted instance
rsync -a --progress --exclude={'CHANGLOG.md','LICENSE','README.md','deploy.sh'} . cnswww-pkyc.ctsi@glint-prod06.osg.ufl.edu:/h/cnswww-pkyc.ctsi/pkyc.ctsi.ufl.edu/htdocs/
