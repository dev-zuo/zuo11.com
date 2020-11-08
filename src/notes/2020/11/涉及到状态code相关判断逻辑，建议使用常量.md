# 涉及到状态code相关判断逻辑，建议使用常量
对于一些状态较多的场景，当我们需要进行一些逻辑时，如果我们用状态的code来写判断逻辑。当后端提供的这个状态文案、code变更或调整，改动可能会很麻烦，特别是功能较多时。

**对于状态相关的判断逻辑，尽量把状态定义为容易识别的常量。这样状态名或状态code变更后，就不需要做大量修改了。**

来看一个实例，假设项目的状态有几种：待审核 0 、待跟进 1、已立项 2、落地成功 3、落地失败 4、 关闭 5 ，有些组件只有待审核可以看到，有些功能只有已立项才能看到

```js
const PROJ_STATUS = {
  PENDING_AUDIT: 0,
  PENDING_FOLLOW: 1,
  ALREADY_SET_UP: 2,
  LAND_SUCCESS: 3,
  LAND_FAILURE: 4,
  CLOSE: 5
}
const PROJ_LABEL_MAP = {
  [PROJ_STATUS.PENDING_AUDIT]: '待审核',
  [PROJ_STATUS.PENDING_FOLLOW]: '待跟进',
  [PROJ_STATUS.ALREADY_SET_UP]: '已立项',
  [PROJ_STATUS.LAND_SUCCESS]: '落地成功',
  [PROJ_STATUS.LAND_FAILURE]: '落地失败',
  [PROJ_STATUS.CLOSE]: '关闭'
}

if (status === PROJ_STATUS.PENDING_AUDIT) {
  // xxx
} else if ([PROJ_STATUS.LAND_SUCCESS,PROJ_STATUS.LAND_FAILURE].includes(status)) {
  // xxx
}
```

这样虽然看起来麻烦一点，但不管你状态文案、code怎么变，前端的改动都会很小。项目越大，变动后维护的成本相对会越低