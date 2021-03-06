const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')


let photosArray = []
let ready = false
let imagesLoaded = 0
let totalImages = 0
let initalLoad = true

//Unsplash API
let count = 5
const apiKey = 'tVhy_cae_O5jDsDisaf2yhoUPMjEA6RL2aGbtgB4rd8'

const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`


//Check if all images were loaded
function imageLoaded() {
    
    imagesLoaded++
    
    if (imagesLoaded === totalImages){
        ready = true
        loader.hidden = true
        count = 30
    }
}

//Helper Function to set attrubutes on dom elements
function setAttributes(element, attributes) {
    for( const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

//Create Elements for Links and phostos

function displayPhotos() {
    imagesLoaded = 0
    totalImages = photosArray.length
    
    //Run function for each object in photosArray
    photosArray.forEach((photo) => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a')
        
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        })

        //Create <img> for photo
        const img = document.createElement('img')

        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })
        //Event listener, check when each is finished loading
        img.addEventListener('load', imageLoaded)

        //Put <img> inside <a>, the put both inside imageContainer Element
        item.appendChild(img)
        imageContainer.appendChild(item)
        
    })
}




//Get photos from splash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl)
        photosArray = await response.json()
        displayPhotos()
    } catch (error) {
        //Catch error 
    }
}

//Check to see if scrolling near bottom of page, load more photos

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false
        getPhotos()
    }
})



//On Load
getPhotos()
