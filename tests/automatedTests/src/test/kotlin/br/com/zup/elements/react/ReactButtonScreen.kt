package br.com.zup.elements.react

import br.com.zup.elements.ButtonScreen
import org.openqa.selenium.WebDriver
import org.openqa.selenium.WebElement
import org.openqa.selenium.support.FindBy
import org.openqa.selenium.support.PageFactory

class ReactButtonScreen(private val driver: WebDriver): ButtonScreen {

    @FindBy(xpath = "//button[@data-beagle-id='_beagle_2']")
    override val buttonDefault: WebElement? = null

    @FindBy(xpath = "//button[@data-beagle-id='_beagle_3']")
    override val buttonWithStyle: WebElement? = null

    @FindBy(xpath = "//button[@data-beagle-id='_beagle_4']")
    override val buttonWithAppearance: WebElement? = null

    @FindBy(xpath = "//button[@data-beagle-id='_beagle_5']")
    override val buttonWithAppearanceAndStyle: WebElement? = null

    @FindBy(xpath = "/html/body/div/div/p")
    override val actionClickText: WebElement? = null

    init {
        PageFactory.initElements(driver, this)
    }
}