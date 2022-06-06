const postsData = require('../data');


class Comment{
    constructor(data){
        this.Title = data.Title;
        this.Text = data.Text;
        this.Emoji = data.Emoji;
        this.Giph = data.Giph;
    }
}


class Post extends Comment {

    constructor(data){
        super(data);
        this.Id = data.Id;
        this.Comments = data.Comments;
    }

    static get allPosts(){
        const posts = postsData.map((post) => new Post(post));
        // for(const el in posts){
        //     (posts[el] = new Post(posts[el]));
        //    // console.log(posts[el]);
        // }
        return posts;
    }

    static findById(id) {
        try {
            const postData = postsData.filter((post) => post.id === id)[0];
            const post = new Post(postData);
            return post;
        } catch (err) {
            throw new Error('That post does not exist!');
        }
    }

    static createPost(post) {
        const newPostId = postsData.length + 1;
        const newPost = new Post({ id: newPostId, ...post});
        postsData.push(newPost);
        return newPost;
    }

    static createComment(post, id) {
        const newComment = new Comment({ ...post});
        postsData[id].Comments.push(newComment);
        return newComment;
    }

    destroyPost(){
        const post = postsData.filter((post) => post.id === this.id)[0];
        postsData.splice(postsData.indexOf(post), 1);


    }

    destroyComment(id){
        const post = postsData.Comments.filter((post) => post.id === id);

        postsData.splice(postsData.indexOf(post), 1);
    

    }

}

module.exports = Post;