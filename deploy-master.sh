echo "开始部署..."

# 防止中文乱码
git config --global core.quotepath false 

echo "git pull"
git pull 

# 查看最近一次提交 log
echo "git log -1"
git log -1 

echo "zuoblog init"
zuoblog init --disable-dev-server

echo "部署完成!"