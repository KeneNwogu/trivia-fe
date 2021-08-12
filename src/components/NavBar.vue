<template>
    <nav>
        <ul>
            <li class="hearts">
                <span id="heart-icon">
                    <div class="heart">
                         
                    </div>
                </span>
                <span>
                    5
                </span>
            </li>
            <li class="logo"><h1>TQ</h1></li>
            <li class="score">{{ score }}</li>
        </ul>
    </nav>
</template>

<script>
export default {
    props: {
        score: Number,
    }
}
</script>

<style>

    nav ul{
        display: flex;
        align-items: center;
        justify-content: space-around;
        margin: auto;
    }

    nav h1{
        color: white;
    }

    .logo{
        position: relative;
        left: -3vw;
    }

    .hearts{
        font-size: 1.5em;
        width: 5vw;
        text-align: right;
        padding: 10px;
        background-color: white;
        border-radius: 30px;
        color: red;

        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .score{
        padding: 10px;
        background-color: white;
        border-radius: 30px;
    }

    .heart{
        position: relative;
        width: 26px;
        height: 23px;
        top: 2px;
    }

    .heart::before, .heart::after{
        content: "";
        background: #f86464;
        position: absolute;
        top: 0;
        width: 13px;
        height: 18px;
        border-radius: 50% 50% 0 0;
    }
    .heart::before{
        transform: rotate(-45deg);
        transform-origin: 0 100%;
        left: 12px;
    }

    .heart::after{
        left: 0;
        transform: rotate(45deg);
        transform-origin: 100% 100%;
    }
</style>