-- Create 25 users with username, email, and password
INSERT INTO users (username, email, password) VALUES
('User1', 'user1@example.com', 'password1'),
('User2', 'user2@example.com', 'password2'),
('User3', 'user3@example.com', 'password3'),
('User4', 'user4@example.com', 'password4'),
('User5', 'user5@example.com', 'password5'),
('User6', 'user6@example.com', 'password6'),
('User7', 'user7@example.com', 'password7'),
('User8', 'user8@example.com', 'password8'),
('User9', 'user9@example.com', 'password9'),
('User10', 'user10@example.com', 'password10'),
('User11', 'user11@example.com', 'password11'),
('User12', 'user12@example.com', 'password12'),
('User13', 'user13@example.com', 'password13'),
('User14', 'user14@example.com', 'password14'),
('User15', 'user15@example.com', 'password15'),
('User16', 'user16@example.com', 'password16'),
('User17', 'user17@example.com', 'password17'),
('User18', 'user18@example.com', 'password18'),
('User19', 'user19@example.com', 'password19'),
('User20', 'user20@example.com', 'password20'),
('User21', 'user21@example.com', 'password21'),
('User22', 'user22@example.com', 'password22'),
('User23', 'user23@example.com', 'password23'),
('User24', 'user24@example.com', 'password24'),
('User25', 'user25@example.com', 'password25');


INSERT INTO posts (author, header, content, tag, votes, image)
SELECT username, CONCAT('Header for ', username), CONCAT('Post content by ', username), 'General', 0, 'https://tinyurl.com/2vp4xeay'
FROM users;


INSERT INTO comments (commentAuthor, postID, content, votes)
SELECT u.username, p.idpost, CONCAT('Comment by ', u.username), 0
FROM users u
JOIN posts p ON u.username = p.author;