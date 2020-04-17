# pkyc-web
PK Yonge COVID19 Testing Website

###

This repo holds the bootstrap website for pkyc.ctsi.ufl.edu that is used to navigate PK Yonge students, parents, and teachers to a REDCap survey. The REDCap survey allows students, parents, and teachers to schedule drive up testing for COVID-19.

## Deployment Instructions

Deploying the website content requires that the id_rsa.pub file be added to the authorized_keys file found on the UFIT Apache hosted instance. To connect to the Apache instance ssh cnswww-pkyc.ctsi@glint-prod06.osg.ufl.edu.

Additionally, you can use the deploy.sh script to copy the content of the pkyc-web folder to the website.
