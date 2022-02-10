echo "开始部署..."

echo "git pull"
git pull 

echo "zuoblog init"
zuoblog init --disable-dev-server

echo "部署完成!"