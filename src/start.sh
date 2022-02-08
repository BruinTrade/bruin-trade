#!/bin/bash

icon_dir=../public/icons/
icons=`ls $icon_dir`
template_file=components/icons/icon_template.js
template=`cat $template_file`
for icon in $icons
do
  icon_name=${icon%.*}
  new_file=components/icons/$icon_name.js
  svg=`cat ../public/icons/$icon`

  #replace ICON_NAME
  echo $svg
  sed 's/<svg \/>/"'"$svg"'"/g' $template_file

done 