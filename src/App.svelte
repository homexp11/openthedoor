<script>

const lockStatusEndpoint='ENVIRONMENT_DOOR_LOCK_STATUS_ENDPOINT'
const homeyWebhook = 'ENVIRONMENT_HOMEY_LOGIC_WEBHOOK';
const homeyCloudId = 'ENVIRONMENT_HOMEY_CLOUD_ID';
const unlockEvent = 'ENVIRONMENT_UNLOCK_EVENT';
const lockEvent = 'ENVIRONMENT_LOCK_EVENT';

const theCode = 4509

const baseUrl= `https://${homeyCloudId}.` +
  `${homeyWebhook}`;

const LOCK_OPEN = "LOCK_OPEN"
const LOCK_CLOSED = "LOCK_CLOSED"
const LOCK_UNKNOWN = "LOCK_UNKNOWN"
const LOCK_OPENING = "LOCK_OPENING"
const LOCK_CLOSING = "LOCK_CLOSING"
const LOCK_ERROR = "LOCK_ERROR" 


const pollTries = 10
const pollIntervall = 1000

// initial status
let pollRemaining = pollTries;
let lockStatus = LOCK_UNKNOWN;

  $:showSpinner = pollRemaining > 0 && lockStatus==LOCK_UNKNOWN;
  $:showHouse = pollRemaining == 0;
  $:showKey = lockStatus===LOCK_CLOSING || lockStatus===LOCK_OPENING

const checkLockStatus = () =>
    fetch(lockStatusEndpoint)
      .then(r => r.json())
      .then(json => {
        setOpenStatus(json);
        pollRemaining -= 1
        if(pollRemaining<=0){
          clearInterval(timer);
          lockStatus=LOCK_UNKNOWN;
        }
      }
      )

  let timer;

  const startTimer = () => {
    lockStatus=LOCK_UNKNOWN;
    pollRemaining = pollTries;
    timer = setInterval(checkLockStatus, pollIntervall);
    }

  startTimer();

  

  const setOpenStatus = isOpen => {
    if(isOpen && lockStatus==LOCK_CLOSING) return;
    if(!isOpen && lockStatus==LOCK_OPENING) return;

    lockStatus = isOpen?LOCK_OPEN:LOCK_CLOSED
  };

  const openTheDoor = () =>{
    lockStatus=LOCK_OPENING;
    pollRemaining=pollTries;
    fetch(
      `${baseUrl}/${unlockEvent}?tag=${theCode}`
    ).then(r => console.log("open gikk bra"))
  }

  const closeTheDoor = () =>
  {
    lockStatus=LOCK_CLOSING;
    pollRemaining=pollTries;
    fetch(
      `${baseUrl}/${lockEvent}`
    ).then(r => console.log("close gikk bra"))
  }

  
</script>

<style>
  h1 {
    color: purple;
  }
  .container {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
   }
   .statusText{font-size: x-small}
   .lockIcon{
      color:green;
      display: inline-block;
      border-radius: 30px;
      box-shadow: 0px 0px 2px #888;
      padding: 1em 1em;
    }
</style>

<svelte:head>
 <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.5/css/bulma.css" />
        <script src="https://kit.fontawesome.com/8383d2e456.js"></script>

</svelte:head>


<body>
  <section class="section">
    <div class="container">
      <h1 class="title">
        Velkommen
      </h1>

<div>
  {#if showHouse} 
    <span class="lockIcon" on:click={startTimer}>
      <i class="fas fa-home fa-10x" /> 
    </span>
  {:else if showSpinner}
    <span class="lockIcon">
      <i class="fas fa-sync-alt fa-10x" /> 
    </span>  
    {:else if showKey} 
    <span class="lockIcon">
      <i class="fas fa-key fa-10x" /> 
    </span>
    {:else if lockStatus==LOCK_CLOSED} 
    <span class="lockIcon" on:click={openTheDoor}>
      <i class="fas fa-lock fa-10x" /> 
    </span>
  {:else if lockStatus==LOCK_OPEN} 
    <span class="lockIcon"  on:click={closeTheDoor}>
      <i class="fas fa-unlock fa-10x" /> 
    </span>
  {/if}
</div>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<span class="statusText">{lockStatus}
{pollRemaining}</span>

</div>
</section>
</body>