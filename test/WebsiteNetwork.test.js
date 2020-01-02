const WebNetwork = artifacts.require('./WebsiteNetwork.sol');

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('WebsiteNetwork', ([deployer, author, tipper])=>{

    let websiteNetwork;
    
    before( async()=>{
        websiteNetwork = await WebNetwork.deployed();
    });

    describe('Deployment', async()=>{
        it('deploys successfully', async()=>{
            const address = await WebNetwork.address;

            assert.notEqual(address, 0x0, 'Address is not zero');
            assert.notEqual(address, null, 'Address is not null');
            assert.notEqual(address, undefined, 'Address must be defined');
            assert.notEqual(address, '', 'Address is not an empty string');
        });

        it('Constructor implented successfully', async()=>{
            const name = await websiteNetwork.name();
            assert.equal(name, "Decentralized Website Network", 'The name has been set right');
        });
    });

    describe('Post functionality', async()=>{
        let result;
        let postCount; 

        before( async()=>{
            result = await websiteNetwork.createPost("Intial post content", {from: author});
            postCount = await websiteNetwork.postCount();
        });

        it('creates posts successfully', async()=>{
            result = await websiteNetwork.createPost("Second post content", {from: author});
            postCount = await websiteNetwork.postCount();
            assert.equal(postCount, 2, 'iterate the id as new post is created');

            let event = result.logs[0].args;
            //Success check 
            assert.equal(event.id.toNumber(), 2, 'id is iterated to 2');
            assert.equal(event.content, "Second post content", 'content matches');
            assert.equal(event.postCredit.toNumber(), 0, 'credits for posts matches');
            assert.equal(event.author, author, 'The author matches');

            //Failure check 
            await websiteNetwork.createPost("", {from: author}).should.be.rejected;
            
        });

        it('lists posts successfully', async()=>{
            const post = await websiteNetwork.posts(postCount);
            assert.equal(post.id.toNumber(), 2, 'id is iterated to 2');
            assert.equal(post.content, "Second post content", 'content matches');
            assert.equal(post.postCredit.toNumber(), 0, 'credits for posts matches');
            assert.equal(post.author, author, 'The author matches');
        });

        it('provides credits to posts successfuly', async()=>{
            let oldBalance = await web3.eth.getBalance(author);
            oldBalance = new web3.utils.BN(oldBalance);

            result = await websiteNetwork.provideCredit(postCount, {from: tipper, value: web3.utils.toWei('1', 'Ether')});
            
            // Success Check
            let event = result.logs[0].args;
            assert.equal(event.id.toNumber(), 2, 'id is iterated to 2');
            assert.equal(event.content, "Second post content", 'content matches');
            assert.equal(event.postCredit, '1000000000000000000', 'credits for posts matches');
            assert.equal(event.author, author, 'The author matches');

            let newBalance = await web3.eth.getBalance(author);
            newBalance = new web3.utils.BN(newBalance);

            let creditProvided = web3.utils.toWei('1', 'Ether');
            creditProvided = new web3.utils.BN(creditProvided);

            let expectedBalance = oldBalance.add(creditProvided);
            assert.equal(expectedBalance.toString(), newBalance.toString(), 'Credit transfer of 1 ether is correct');

            // Failure Check
            await websiteNetwork.provideCredit(99, {from: tipper, value: web3.utils.toWei('1', 'Ether')}).should.be.rejected;

        });

    });
})

