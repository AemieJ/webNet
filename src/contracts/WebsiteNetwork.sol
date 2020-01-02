pragma solidity ^0.5.0;

contract WebsiteNetwork { 
    string public name;
    uint public postCount = 0;

    mapping(uint => Post) public posts;

    struct Post { 
        uint id;
        string content;
        uint postCredit;
        address payable author;
    }

    event CreatePost(
        uint id,
        string content,
        uint postCredit,
        address payable author
    );

    event ProvideTip(
        uint id,
        string content,
        uint postCredit,
        address payable author
    );

    constructor() public {
        name = "Decentralized Website Network";
    }

    function add(uint x, uint y) internal pure returns (uint z) {
        require((z = x + y) >= x, "ds-math-add-overflow");
    }

    function createPost(string memory _content) public {
        require(bytes(_content).length > 0);
        postCount = add(postCount, 1);
        posts[postCount] = Post(postCount, _content, 0, msg.sender);
        emit CreatePost(postCount, _content, 0, msg.sender);
    }

    function provideCredit(uint _id) public payable {
        require(_id > 0 && _id <= postCount);
        Post memory _post = posts[_id];
        address payable _author = _post.author;
        _author.transfer(msg.value); 

        _post.postCredit = add(_post.postCredit, msg.value);
        posts[_id] = _post;
        emit ProvideTip(_id, _post.content, _post.postCredit, _author);
    }


}