rm /etc/nginx/cert/*;
echo “ls”
ls /etc/nginx/cert/;
echo “检查文件是否已删除”
cp ./fileCenter/* /etc/nginx/cert/;
echo “再次ls”
ls /etc/nginx/cert/;
