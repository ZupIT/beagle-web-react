package br.com.zup.elements.angular

import br.com.zup.elements.ButtonScreen
import org.openqa.selenium.WebDriver
import org.openqa.selenium.WebElement
import org.openqa.selenium.support.FindBy
import org.openqa.selenium.support.PageFactory

class AngularButtonScreen(private val driver: WebDriver): ButtonScreen {

    override val buttonDefault: WebElement?
        get() = TODO("Not yet implemented")
    override val buttonWithStyle: WebElement?
        get() = TODO("Not yet implemented")
    override val buttonWithAppearance: WebElement?
        get() = TODO("Not yet implemented")
    override val buttonWithAppearanceAndStyle: WebElement?
        get() = TODO("Not yet implemented")
    override val actionClickText: WebElement?
        get() = TODO("Not yet implemented")

    init {
        PageFactory.initElements(driver, this)
    }

}