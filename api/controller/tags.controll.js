import tagsModel from '../models/tags.model';
import { responseClient } from '../../util/util.js';
/**
 * 添加tag 标签
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.addTag = async (req, res, next) => {
  let {
    tagName,
    description
  } = req.body;
  if (!tagName) {
    responseClient(res, 200, 201, '标签名不可为空');
    next();
  };
  try {
    tagsModel.findOne({
      tagName: tagName
    }).then(data => {
      if (data) {
        responseClient(res, 200, 201, '标签已存在');
        next();
      } else {
        let tag = new tagsModel({
          tagName: tagName,
          description: description,
          time: new Date(),
          author: req.session.userName || '',
        });
        tag.save().then(saveInfo => {
          responseClient(res, 200, 200, '标签保存成功', saveInfo);
          next();
        }).catch(err => {
          responseClient(res, 500, 500, '系统异常', err);
          next();
        });
      };
    });
  } catch (err) {
    responseClient(res, 200, 201, '标签保存失败', err);
    next();
  };
};
/**
 * 标签列表
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.tagList = async (req, res, next) => {
  let queryOptions = {};
  if (req.originalUrl.indexOf('/admin/') === 0) {
    queryOptions = {
      author : req.session.userName
    }
  }
  let {
    author = 'admin'
  } = req.query
  try {
    tagsModel.find(queryOptions).then(data => {
      responseClient(res, 200, 200, '成功', data);
      next();
    }).catch(err => {
      responseClient(res, 500, 500, '服务器异常！', err);
      next();
    });
  } catch (err) {
    responseClient(res, 200, 201, '查询失败', err);
    next();
  };
};
/**
 * 删除标签
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.delTag = async (req, res, next) => {
  let { tagId } = req.params;
  if (!tagId) {
    responseClient(res, 200, 201, '标签名不可为空');
    next();
  } else {
    try {
      tagsModel.remove({ _id: tagId }).then(tagResult => {
        if (tagResult.n === 1) {
          responseClient(res, 200, 200, '删除标签成功！');
          next();
        } else {
          responseClient(res, 200, 201, '标签不存在！');
          next();
        };
      }).catch(err => {
        responseClient(res, 500, 500, '服务器异常！', err);
        next();
      });
    } catch (err) {
      responseClient(res, 200, 500, '删除失败！', err);
      next();
    };
  };
};
