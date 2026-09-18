package com.devsolve.dto;

import lombok.Data;
import java.util.UUID;

public class CreatePostDto {

    @Data
    public static class Request {
        private String title;
        private String category;
        private String difficulty = "Medium";
        private String problemStatement;
    }

    @Data
    public static class SolutionRequest {
        private UUID postId;
        private String repoLink;
        private String liveDemoLink;
        private String writeup;
    }

    @Data
    public static class CommentRequest {
        private UUID postId;
        private UUID parentId; // Optional parent comment ID for nested replies
        private String content;
    }
}
