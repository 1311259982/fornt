# **个人博客 API 文档**

## **通用响应格式**

所有 API 接口都遵循统一的响应结构：

```json
{
  "code": 200,
  "msg": "success",
  "data": {}
}
```

-   `code`: 状态码，`200` 表示成功，其他值表示失败。
-   `msg`: 响应消息，通常为 "success" 或错误信息。
-   `data`: 实际返回的数据，可以是对象、数组或 `null`。

---

## **1. 认证模块 (`/api/auth`)**

### **1.1 用户注册**

-   **功能**: 创建一个新用户账户。
-   **URL**: `/api/auth/register`
-   **方法**: `POST`
-   **请求体**:

    ```json
    {
      "username": "your_username",
      "email": "user@example.com",
      "password": "your_password",
      "role": "USER"
    }
    ```

-   **成功响应 (200 OK)**:

    ```json
    {
      "code": 200,
      "msg": "success",
      "data": null
    }
    ```

-   **失败响应 (用户名或邮箱已存在)**:

    ```json
    {
      "code": 500,
      "msg": "用户名已被注册", // 或 "邮箱已被注册"
      "data": null
    }
    ```

### **1.2 用户登录**

-   **功能**: 用户登录并获取认证 Token。
-   **URL**: `/api/auth/login`
-   **方法**: `POST`
-   **请求体**:

    ```json
    {
      "email": "user@example.com",
      "password": "your_password"
    }
    ```

    *注意：登录时可以使用 `username` 或 `email`。*

-   **成功响应 (200 OK)**:

    ```json
    {
      "code": 200,
      "msg": "success",
      "data": {
        "id": 1,
        "username": "your_username",
        "role": "USER",
        "token": "jwt.token.string"
      }
    }
    ```

-   **失败响应 (凭证错误)**:

    ```json
    {
      "code": 500,
      "msg": "登录失败，请检查您的用户名/邮箱或密码",
      "data": null
    }
    ```

---

## **2. 文章模块 (`/api/posts`)**

*注意：除公共列表和详情接口外，其他接口均需要有效的 `Authorization: Bearer <token>` 请求头。*

### **2.1 创建文章**

-   **功能**: 创建一篇或多篇文章（支持批量创建）。
-   **URL**: `/api/posts`
-   **方法**: `POST`
-   **请求体**: `List<Post>`

    ```json
    [
      {
        "title": "我的第一篇文章",
        "content": "这是文章内容...",
        "isPublished": true
      }
    ]
    ```

    -   `isPublished`: `true` 表示直接发布，`false` 或 `null` 表示保存为草稿。

-   **成功响应 (201 Created)**:

    ```json
    {
      "code": 200,
      "msg": "success",
      "data": 201
    }
    ```

### **2.2 获取文章列表（公开）**

-   **功能**: 分页获取已发布的文章列表。
-   **URL**: `/api/posts`
-   **方法**: `GET`
-   **查询参数**:
    -   `page` (可选, 默认 `0`): 页码。
    -   `size` (可选, 默认 `10`): 每页数量。
    -   `sort` (可选, 默认 `createdAt,desc`): 排序字段和方向。
    -   `categoryId` (可选): 分类 ID。
    -   `tagName` (可选): 标签名称。
-   **成功响应 (200 OK)**:

    ```json
    {
      "code": 200,
      "msg": "success",
      "data": [
        {
          "id": 1,
          "userId": 1,
          "title": "文章标题",
          "content": "文章内容...",
          "slug": "article-title-slug",
          "views": 100,
          "isPublished": true,
          "createdAt": "2023-10-27T10:00:00.000+00:00",
          "updatedAt": "2023-10-27T10:00:00.000+00:00"
        }
      ]
    }
    ```

### **2.3 获取当前用户的文章**

-   **功能**: 获取当前登录用户的所有文章，可根据发布状态筛选。
-   **URL**: `/api/posts/my`
-   **方法**: `GET`
-   **查询参数**:
    -   `isPublished` (可选, 布尔类型): 根据发布状态筛选文章。
        -   `true`: 只返回已发布的文章。
        -   `false`: 只返回草稿状态的文章。
        -   如果此参数省略，则返回所有文章。
-   **成功响应 (200 OK)**:
    -   响应结构同 **2.2 获取文章列表**。

### **2.4 获取单篇文章详情（公开）**

-   **功能**: 根据 ID 获取单篇文章的详细内容。
-   **URL**: `/api/posts/{id}`
-   **方法**: `GET`
-   **成功响应 (200 OK)**:
    -   响应结构同 **2.2 获取文章列表** 中的单个文章对象。

### **2.5 更新文章**

-   **功能**: 根据 ID 更新一篇文章。
-   **URL**: `/api/posts/{id}`
-   **方法**: `PUT`
-   **请求体**:

    ```json
    {
      "title": "更新后的标题",
      "content": "更新后的内容...",
      "isPublished": true
    }
    ```

-   **成功响应 (200 OK)**:

    ```json
    {
      "code": 200,
      "msg": "success",
      "data": null
    }
    ```

### **2.6 删除文章**

-   **功能**: 根据 ID 删除一篇文章。
-   **URL**: `/api/posts/{id}`
-   **方法**: `DELETE`
-   **成功响应 (200 OK)**:

    ```json
    {
      "code": 200,
      "msg": "success",
      "data": 200
    }
    ```

---

## **3. 预留接口**

以下是为未来功能预留的接口，当前尚未实现。

### **3.1 分类模块 (`/api/categories`)**

-   `GET /api/categories`: 获取所有分类。
-   `POST /api/categories`: 创建新分类 (管理员权限)。
-   `PUT /api/categories/{id}`: 更新分类 (管理员权限)。
-   `DELETE /api/categories/{id}`: 删除分类 (管理员权限)。

### **3.2 标签模块 (`/api/tags`)**

-   `GET /api/tags`: 获取所有标签。
-   `POST /api/tags`: 创建新标签。
-   `DELETE /api/tags/{id}`: 删除标签。

### **3.3 评论模块 (`/api/comments`)**

-   `GET /api/posts/{postId}/comments`: 获取一篇文章的所有评论。
-   `POST /api/posts/{postId}/comments`: 为文章添加新评论。
-   `DELETE /api/comments/{id}`: 删除一条评论。

### **3.4 用户模块 (`/api/users`)**

-   `GET /api/users/me`: 获取当前用户的详细信息。
-   `PUT /api/users/me`: 更新当前用户的信息。
