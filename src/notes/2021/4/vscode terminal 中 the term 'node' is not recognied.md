# vscode terminal 中 the term 'node' is not recognied

windows 系统下，在 vscode 的 Terminal 中，运行 npm install 或 node 命令时都会提示 the term node/npm is not recognied... 但是如果打开系统的 terminal 运行命令就是正常的。

仔细看会发现 vscode 中使用的是 Powershell，而一般默认的 bash。Powershell 中无法执行 node 命令，需要运行下面的命令更新环境变量中的 Path

```bash
# 运行下面的命令，重启系统即可
$env:path -split ';' | Select-String nodejs
```

> Check the Path in environment variable using script `$env:path -split ';' | Select-String nodejs` and once you update the Path in environment variable, make sure to restart powershell and also restart explorer.exe. This would resolve the issue.


参考：[windows - The term 'node' is not recognized... In Powershell - Stack Overflow](https://stackoverflow.com/questions/30318628/the-term-node-is-not-recognized-in-powershell)