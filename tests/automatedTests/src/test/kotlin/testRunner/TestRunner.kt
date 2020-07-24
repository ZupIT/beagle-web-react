package testRunner

import io.cucumber.junit.Cucumber
import io.cucumber.junit.CucumberOptions
import org.junit.runner.RunWith


@RunWith(Cucumber::class)
@CucumberOptions(
        features = ["/Users/deblianesousa/Documents/Work/01-GIT/01-BEAGLE/beagle-web-react/tests/automatedTests/Feature"],
        glue = ["steps"])

class TestRunner {
}