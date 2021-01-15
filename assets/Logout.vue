<template>
    <div id="logout"> 
             <b-tooltip label="Wyloguj się"
            type="is-dark"
            position="is-bottom">
    <svg id="ringbackground" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12"/></svg>
    <svg id="iconlogout" width="36" height="36" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M11 21h8v-2l1-1v4h-9v2l-10-3v-18l10-3v2h9v5l-1-1v-3h-8v18zm10.053-9l-3.293-3.293.707-.707 4.5 4.5-4.5 4.5-.707-.707 3.293-3.293h-9.053v-1h9.053z"/></svg>
             </b-tooltip>
    </div>
</template>

<style scoped>



#iconlogout{
    position: relative;
        top: -37px;
    left: 10px;

}

#ringbackground{
    fill: #CCCCCC;
    position: relative;
        top:0px;
    left: 0px;

}

#logout{
    position: relative;
    padding:10px;
    float: left;
    cursor: pointer;
        width:40px;
        height: 40px;

}

</style>