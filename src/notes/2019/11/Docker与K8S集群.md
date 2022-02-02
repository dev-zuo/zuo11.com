---
{
  "title": "Docker与K8S集群",
  "staticFileName": "docker_k8s.html",
  "author": "guoqzuo",
  "createDate": "2019/11/11",
  "description": "现在前端项目很多部署在docker容器上，相比之前的实体服务器、虚拟机来讲，docker不需要自己安装软件，可以直接配置使用，比较方便。下面来简单了解下",
  "keywords": "Docker与K8S集群",
  "category": "运维部署与版本控制"
}
---

# Docker与K8S集群

现在前端项目很多部署在docker容器上，相比之前的实体服务器、虚拟机来讲，docker不需要自己安装软件，可以直接配置使用，比较方便。下面来简单了解下

## Docker容器
容器是虚拟机的一个发展，相对传统的虚拟机，容器的优点:

特性 | 虚拟机 | 容器
--- | --- | ---
隔离级别 | 操作系统级 | 进程级
隔离策略 | Hypervisor | CGroups
系统资源 | 5-15% | 0-5%
启动时间 | 分钟级 | 秒级
镜像存储 | GB-TB | KB-MB
集群规模 | 上百 | 上万
高可用策略 | 备份、容灾、迁移 | 弹性、负载、动态

## K8S集群
K8S是基于容器的集群管理平台，它的全称，是kubernetes。
- Kubernetes这个单词来自于希腊语，含义是舵手或领航员。K8S是它的缩写，用“8”字替代了“ubernete”这8个字符。
- 和Docker不同，K8S的创造者，是众人皆知的行业巨头——Google。K8S是2014年6月由Google公司正式公布出来并宣布开源的。
- 一个K8S系统，通常称为一个K8S集群（Cluster）。这个集群主要包括两个部分：
  - 一个Master节点（主节点）主要负责管理和控制
    - API Server 是整个系统的对外借款，供客户端何其他组件调用，相当于营业厅
    - Scheduler 负责对集群内的资源进行调度，相当于调度室
    - Controller manager负责管理控制器，相当于大总管
  - 一群Node节点（计算节点）Node节点是工作负载节点，里面是具体的容器
    - Docker 用来创建容器 
    - kubelet 主要负责监视指派到它所在Node上的Pod，包括创建、修改、监控、删除等
    - kebu-proxy 主要负责为Pod对象提供代理
    - Fluentd 主要负责日志收集、存储与查询
    - kube-dns（可选）
    - Pod, Pod是Kubernetes最基本的操作单元。一个Pod代表着集群中运行的一个进程，它内部封装了一个或多个紧密相关的容器。除了Pod之外，K8S还有一个Service的概念，一个Service可以看作一组提供相同服务的Pod的对外访问接口。

## 参考
[干货满满！10分钟看懂Docker和K8S](https://my.oschina.net/jamesview/blog/2994112)