
import authRoutes from '../routes/auth.route';
import commentRoutes from '../routes/comment.route';
import postRoutes from '../routes/post.route';
import userRoutes from '../routes/user.route';




export const registerRoutes = (app:any) => {
    app.use("/api/auth", authRoutes);
    app.use("/api/comments", commentRoutes);
    app.use("/api/posts", postRoutes);
    app.use("/api/users", userRoutes);
}