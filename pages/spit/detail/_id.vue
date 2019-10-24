<template>
  <!--两列布局-->
  <div class="wrapper tc-detail">
    <div class="fl left-list">
      <div class="tc-detail">
        <!-- 标题区 -->
        <div class="detail-tit">
          <div class="detail-author">
            <a href="javascript:;">luckness</a> 发布
          </div>
          <div class="detail-content">
            <p>今天入职腾讯，产品岗，普通非985211大学，上家是不到五十人创业小公司！16年毕业！找内推腾讯给的面试机会，五轮面试！可能是我把运气攒一起了！</p>
            <img src="../../../assets/img/widget-tc-detail.png" alt="" />
          </div>
          <div class="detail-tool">
            <ul>
              <li><span class="star"><i class="fa fa-thumbs-o-up" aria-hidden="true"></i> 53</span></li>
              <li><a href="#" data-toggle="modal" data-target="#shareModal"><i class="fa fa-share-alt" aria-hidden="true"></i> 44</a></li>
              <li><a data-toggle="modal" data-target="#remarkModal"><i class="fa fa-commenting" aria-hidden="true"></i> 666</a></li>
            </ul>
          </div>
        </div>
        <!-- 评论区 -->
        <div class="comment-area">
          <div class="comment-tit">
            <span>评论</span>
          </div>
          <ul class="comment-list">
            <li>
              <div class="item-photo">
                <img src="../../../assets/img/widget-widget-photo.png" alt="" />
              </div>
              <div class="item-content">
                <p class="author"><a href="javascript:;">luckness</a> 发布</p>
                <p class="content">运气+实力吧？不能谦虚哦，沙发！</p>
              </div>
              <div class="item-thumb">
                <div>
                  <i class="fa fa-thumbs-o-up" aria-hidden="true"></i> 52
                </div>
              </div> </li>
            <li>
              <div class="item-photo">
                <img src="../../../assets/img/widget-widget-photo.png" alt="" />
              </div>
              <div class="item-content">
                <p class="author"><a href="javascript:;">luckness</a> 发布</p>
                <p class="content">运气+实力吧？不能谦虚哦，沙发！</p>
              </div>
              <div class="item-thumb">
                <div>
                  <i class="fa fa-thumbs-o-up" aria-hidden="true"></i> 52
                </div>
              </div> </li>
            <li>
              <div class="item-photo">
                <img src="../../../assets/img/widget-widget-photo.png" alt="" />
              </div>
              <div class="item-content">
                <p class="author"><a href="javascript:;">luckness</a> 发布</p>
                <p class="content">内推我吧，条件一样，还要人么？内推我吧，条件一样，还要人么？内推我吧，条件一样，还要人么？内推我吧，条件一样，还要人么？内推我吧，条件一样，还要人么？内推我吧，条件一样，还要人么？内推我吧，条件一样，还要人么？内推我吧，条件一样，还要人么？</p>
              </div>
              <div class="item-thumb">
                <div>
                  <i class="fa fa-thumbs-o-up" aria-hidden="true"></i> 52
                </div>
              </div> </li>
            <li>
              <div class="item-photo">
                <img src="../../../assets/img/widget-widget-photo.png" alt="" />
              </div>
              <div class="item-content">
                <p class="author"><a href="javascript:;">luckness</a> 发布</p>
                <p class="content">运气+实力吧？不能谦虚哦，沙发！</p>
              </div>
              <div class="item-thumb">
                <div>
                  <i class="fa fa-thumbs-o-up" aria-hidden="true"></i> 52
                </div>
              </div> </li>
            <li>
              <div class="item-photo">
                <img src="../../../assets/img/widget-widget-photo.png" alt="" />
              </div>
              <div class="item-content">
                <p class="author"><a href="javascript:;">luckness</a> 发布</p>
                <p class="content">运气+实力吧？不能谦虚哦，沙发！</p>
              </div>
              <div class="item-thumb">
                <div>
                  <i class="fa fa-thumbs-o-up" aria-hidden="true"></i> 52
                </div>
              </div> </li>
            <li>
              <div class="item-photo">
                <img src="../../../assets/img/widget-widget-photo.png" alt="" />
              </div>
              <div class="item-content">
                <p class="author"><a href="javascript:;">luckness</a> 发布</p>
                <p class="content">运气+实力吧？不能谦虚哦，沙发！</p>
              </div>
              <div class="item-thumb">
                <div>
                  <i class="fa fa-thumbs-o-up" aria-hidden="true"></i> 52
                </div>
              </div> </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="fl right-tag">
      <div class="block-btn">
        <p>来个匿名吐槽，发泄一下你心中的怒火吧！</p>
        <a class="sui-btn btn-block btn-share" href="./spit-submit.html" target="_blank">发吐槽</a>
      </div>
    </div>
    <div class="clearfix"></div>
  </div>
</template>

<script>
import axios from 'axios'

  export default {
    asyncData ({ params }) {
      return axios.get(`https://www.easy-mock.com/mock/5c8a5b3058b0022d26205fc9/spit/detail/${params.id}`).then((res) => {
        return { items: res.data.data }
      })
    }
  }
</script>
